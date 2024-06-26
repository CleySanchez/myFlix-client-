// Import the 'createRoot' method from 'react-dom/client' to create a root for React rendering
import { createRoot } from "react-dom/client";

// Import the 'MainView' component from the 'components/main-view/main-view' file
import { MainView } from "./components/MainView/MainView";

// Import the main SCSS file for styling
import "./index.scss";

// Define the main application component
const App = () => {
  // Return the 'MainView' component as the main UI
  return <MainView />;
};

// Find the root DOM element to render the React application into
const container = document.querySelector("#root");

// Create a React root to manage the rendering of the React component tree
const root = createRoot(container);

// Render the 'App' component (which includes 'MainView') into the root DOM element
root.render(<App />);
