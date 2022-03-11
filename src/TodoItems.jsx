import React from "react";

function TodoItems({ data, onDelete }) {
  return (
    <div className="column is-5 mx-5">
      {data.map((el) => {
        return (
          <div className="control" key={el.id}>
            <p>{el.author}</p>
            <div className="is-flex is-justify-content-center is-align-items-center">
              <p>{el.title}</p>
              <button onClick={(e) => onDelete(e, el.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoItems;
