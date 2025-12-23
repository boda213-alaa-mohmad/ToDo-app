/**
 * I will make the awsome project en sha Allah
 * that about TODO app for Islam I don't know How I can
 * begin but I trust in Allah for helping me don't be
 * frustrated or disappointed you will got this
 * and remeber that for Islam not just only to yourself
 */

//19 / 12 / 2025
// make jsx and css of files
// functions of clickhandler, and keyPressHandler

//20/12/2025

"use client";
import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";

interface Todo {
  id: string;
  todo: string;
  completed: boolean;
  timeCreated: number;
}

const rotobto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

// start small man
//ask chat gpt about how I can make responsive web

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [toDo, setToDo] = useState<Todo[]>([]);
  const [, setCount] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);
  const activeCount = toDo.filter((todo) => !todo.completed).length;
  const completedCount = toDo.filter((todo) => todo.completed).length;
  type filterTyped = "all" | "active" | "completed";
  const [filter, setFilter] = useState<filterTyped>("all");

  const visibleToDo = toDo.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  useEffect(() => {
    const stored = localStorage.getItem("item");
    if (stored) {
      try {
        setToDo(JSON.parse(stored));
      } catch {
        console.error("Failed to load todos");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(toDo));
  }, [toDo]);

  useEffect(() => {
    console.log(toDo);
  }, [toDo]);

  function addToDo(): void {
    if (input.trim() === "") {
      return;
    }

    setToDo((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        todo: input,
        completed: false,
        timeCreated: Date.now(),
      },
    ]);
    setInput("");
    setCount((count) => count + 1);
  }

  function keyPressHandler(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      addToDo();
    }
  }

  function clickHandler(): void {
    addToDo();
  }

  return (
    <div className="container">
      <div className={`container-todo`}>
        <h1 className={`header ${rotobto.className}`}>My Tasks</h1>
        <p>Stay organized and productive</p>

        {/* input field */}
        <div className="div-input-button">
          <input
            className={`input-field ${rotobto.className}`}
            placeholder="Add a new task..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyPress={keyPressHandler}
          />
          <button onClick={clickHandler} className="add-button">
            Add
          </button>
        </div>

        <div className="options">
          <button
            onClick={() => {
              setFilter("all");
            }}
          >
            All ({toDo.length})
          </button>

          <button
            onClick={() => {
              setFilter("completed");
            }}
          >
            completed ({completedCount})
          </button>
          <button
            onClick={() => {
              setFilter("active");
            }}
          >
            Active ({activeCount})
          </button>
        </div>

        <div className="empty-state">
          {toDo.length !== 0 ? (
            <div>
              {visibleToDo.map(function (item: Todo) {
                return (
                  <div className="results-todo" key={item.id}>
                    <div className="checkbox-span">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {
                          setToDo((prev) =>
                            prev.map(function (todo) {
                              return todo.id === item.id
                                ? { ...todo, completed: !todo.completed }
                                : todo;
                            })
                          );
                        }}
                      />
                      <span className={`${rotobto.className}`}>
                        {item.todo}
                      </span>
                    </div>

                    <div className="button-options">
                      <button
                        onClick={() => {
                          setEdit(!edit);
                          console.log(edit);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          const filterToDo = toDo.filter(function (
                            value: Todo
                          ) {
                            return item.id !== value.id;
                          });

                          setToDo(filterToDo);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="output-todo">No tasks yet. Add one to get Started!</p>
          )}
        </div>
        <div className="stats">
          <p>{toDo.length} active Tasks</p>
        </div>
      </div>

      {/* {
        edit && (
          <div className="edit-card">
            <h2>Editing the task</h2>
            <input type="text" />
            <button>okay</button>
            <button>cancel</button>
          </div>
        )
      } */}
    </div>
  );
}
