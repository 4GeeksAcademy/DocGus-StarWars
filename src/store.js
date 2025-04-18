export const initialStore = () => {
  return {
    personajes:[],
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
      case "personajes":
        return{
        ...store,
        personajes:action.payload
      }
    default:
      throw Error('Unknown action.');
  }
}

export const fechtPersonajes = async (dispatch) => {
  try {
    const response = await fetch("https://www.swapi.tech/api/people")
    console.log(response)
    const data = await response.json()
    console.log(data)
    dispatch({
      type:"personajes", 
      payload:data.results
    })
  } catch (error) {
    console.log(error)
  }
}
