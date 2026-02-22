import VirtulizedList from "./components/VirtulizedList";

function App() {
  const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

  return (
    <VirtulizedList list={LIST} height={400} width={300} itemHeight={35} />
  )
}

export default App
