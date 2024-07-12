// src/index.jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainView } from "./components/MainView/MainView";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.scss";

const MyFlixApplication = () => {
  return (
    <BrowserRouter>
      <Container>
        <MainView />
      </Container>
    </BrowserRouter>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);

