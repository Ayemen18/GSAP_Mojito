import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div className="flex-center h-[100vh]">
      <h1>App</h1>
    </div>
  )
}

export default App