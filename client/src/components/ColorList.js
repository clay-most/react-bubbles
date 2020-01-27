import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    code: { hex: "" },
    color: "",
    id: Math.random()
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        axiosWithAuth()
          .get(`/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err));
        setEditing(false);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(() => {
        axiosWithAuth()
          .get("/colors")
          .then(res => updateColors(res.data))
          .catch(err => console.log("Error",err));
        setEditing(false);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  const createColorSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/colors`, newColor)
      .then(() => {
        axiosWithAuth()
          .get(`/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err));
      });
  };

  const createColorChange = e => {
    e.preventDefault();
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div>
        <h2>Add a New Color Here</h2>
        <form onSubmit={createColorSubmit}>
          <input
            type="text"
            name="color"
            value={newColor.color}
            onChange={createColorChange}
            placeholder="New Color Name"
          />
          <input
            type="text"
            name="code"
            value={newColor.code.hex}
            onChange={e =>
              setNewColor({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            placeholder="New Hex Code"
          />
          <button type="submit">Create Color</button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
