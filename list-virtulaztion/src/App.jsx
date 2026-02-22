import VirtulizedList from "./components/VirtulizedList";
import UsersApp from "./virtuoso/UsersApp";

function App() {
  // const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

  // return (
  //   <VirtulizedList list={LIST} height={400} width={300} itemHeight={35} />
  // )

  return <UsersApp pageLength={20} />
}

export default App
