import { App, About, Contact, History, CurrentCEO } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
    <Routes>
        <Route path="/" element={<App library="GraphQL" version={18.2} />} />
        <Route path="/about" element={<About />}>
            <Route path="history" element={<History />} />
            <Route path="current-ceo" element={<CurrentCEO />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
    </Routes>
</BrowserRouter>;
