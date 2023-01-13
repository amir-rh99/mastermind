import { createRoot } from "react-dom/client"
import App from "./app/App"

const Root = createRoot(document.getElementById("root") as HTMLElement)

Root.render(<App />)