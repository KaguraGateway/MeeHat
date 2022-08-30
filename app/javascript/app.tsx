import React from 'react';
import { createRoot } from "react-dom/client";
import { MeeHatApp } from './app/MeeHatApp';

const container = document.getElementById("app-container");
const root = createRoot(container!);
root.render(<MeeHatApp />);