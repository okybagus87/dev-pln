import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Dashboard from "../page/dashboard/Dashboard";

export default function Web() {
    return (
        <Routes>
            <Route path="/dashboard" component={Dashboard} />
        </Routes>
    );
}