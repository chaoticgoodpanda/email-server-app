// if any file is exporting a class or a component, it gets named a capital letter (App.js)
// but if it's just a function, lowercase (index.js)

import React from "react";

const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App = () => {
    return (
        <div>
            Hi There!
        </div>
    );
};

export default App;