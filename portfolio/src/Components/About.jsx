import { useState, useEffect, useRef } from "react";
import avatar from "../assets/shesh.png";

// ── All real SVG tech logos ───────────────────────────────────────────────────
const SKILL_LOGOS = {
  JavaScript: (
    <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" fill="#f7df1e" rx="4"/><path d="M9 25.7l2.3-1.4c.4.8.8 1.4 1.7 1.4.9 0 1.4-.4 1.4-1.7V16h2.8v8.1c0 2.8-1.6 4-4 4-2.1 0-3.4-1.1-4.2-2.4zm8.5-.3l2.3-1.4c.6 1 1.3 1.8 2.7 1.8 1.1 0 1.9-.6 1.9-1.4 0-1-.7-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.5-3.6 4-3.6 1.7 0 3 .6 3.9 2.2l-2.1 1.4c-.5-.9-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .9.5 1.2 1.7 1.7l.7.3c2.3 1 3.7 2 3.7 4.3 0 2.4-1.9 3.8-4.5 3.8-2.5 0-4.1-1.2-4.9-2.8z" fill="#000"/></svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" fill="#3178c6" rx="4"/><path d="M18.6 22.7v2.7c.5.2 1 .4 1.6.5.6.1 1.2.2 1.9.2.6 0 1.2-.1 1.8-.2.5-.2 1-.4 1.4-.7.4-.3.7-.7.9-1.2.2-.5.3-1.1.3-1.7 0-.5-.1-.9-.2-1.3-.1-.4-.4-.7-.6-1-.3-.3-.6-.5-1-.7-.4-.2-.9-.4-1.4-.6-.4-.1-.7-.3-1-.4-.3-.1-.5-.3-.7-.4-.2-.2-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2 0-.4.1-.5.1-.2.2-.3.4-.4.2-.1.3-.2.5-.2.2-.1.4-.1.7-.1.2 0 .4 0 .6.1.2 0 .4.1.6.2.2.1.4.2.5.3.2.1.3.3.4.4l2-2c-.3-.4-.6-.7-1-.9-.4-.2-.8-.4-1.2-.5-.4-.1-.8-.2-1.3-.2-.4 0-.9 0-1.3.1-.5.1-.9.3-1.3.5-.4.2-.7.6-1 1-.3.4-.4.9-.4 1.5 0 .8.2 1.5.7 2 .5.5 1.2 1 2.1 1.3.4.2.8.3 1.1.4.3.1.6.3.8.4.2.2.4.3.5.5.1.2.2.4.2.7 0 .2 0 .4-.1.6-.1.2-.2.3-.4.4-.2.1-.4.2-.6.3-.2.1-.5.1-.8.1-.5 0-1.1-.1-1.6-.4-.5-.2-.9-.6-1.3-1.1l-2 1.9zM8 17.5H5v-2.6h8.6v2.6h-3v8.6H8v-8.6z" fill="#fff"/></svg>
  ),
  Java: (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M12.3 22.2s-1 .6.7.8c2 .2 3 .2 5.2-.2 0 0 .6.4 1.4.7-4.9 2.1-11.1-.1-7.3-1.3zM11.7 19.4s-1.1.8.6.9c2.2.2 4 .2 7-.3 0 0 .4.4 1 .6-6.2 1.8-13.1.2-8.6-1.2z" fill="#4E7896"/><path d="M17.4 14.6c1.3 1.5-.3 2.8-.3 2.8s3.2-1.6 1.7-3.7c-1.4-1.9-2.5-2.8 3.4-6-.1 0-9.3 2.3-4.8 6.9z" fill="#E76F00"/><path d="M23.3 24.2s.7.6-.8.9c-2.9.9-12 1.1-14.5.1-1-.4.8-.9 1.3-.9.6-.1.9-.1.9-.1-.9-.7-6.4 1.4-2.7 2 9.9 1.6 18.1-.7 15.8-2zM12.7 16.5s-4.3 1-.6 1.4c1.7.2 5 .1 8.1-.1 2.5-.2 5.1-.7 5.1-.7s-.9.4-1.5.7c-6.2 1.6-18.1.9-14.7-.7 3-1.3 3.6-.6 3.6-.6zM20.9 21c6.3-3.3 3.4-6.4 1.4-6-.5.1-.7.2-.7.2s.2-.3.6-.4c4.3-1.5 7.6 4.5-1.3 6.9 0 0 .1-.1 0-.7z" fill="#4E7896"/><path d="M19.1 3s2.5 2.5-2.3 6.3c-3.8 3-2.8 4.7 0 6.7-2-1.8-3.5-3.4-2.5-4.9 1.4-2.2 5.5-3.3 4.8-8.1z" fill="#E76F00"/></svg>
  ),
  Python: (
    <svg viewBox="0 0 32 32" width="28" height="28"><defs><linearGradient id="py1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#387EB8"/><stop offset="100%" stopColor="#366994"/></linearGradient><linearGradient id="py2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFE052"/><stop offset="100%" stopColor="#FFC331"/></linearGradient></defs><path d="M15.9 3C11 3 11.3 5.1 11.3 5.1v2.1h4.7v.6H8.7S5.9 7.5 5.9 12.5s2.5 4.8 2.5 4.8H10v-2.3s-.1-2.5 2.4-2.5h4.2s2.3 0 2.3-2.2V5.4S19.3 3 15.9 3zm-2.3 1.3c.4 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.4-.8.8-.8z" fill="url(#py1)"/><path d="M16.1 29c4.9 0 4.6-2.1 4.6-2.1v-2.1h-4.7v-.6h7.3s2.8.3 2.8-4.7-2.5-4.8-2.5-4.8H22v2.3s.1 2.5-2.4 2.5h-4.2s-2.3 0-2.3 2.2v3.9S12.7 29 16.1 29zm2.3-1.3c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8z" fill="url(#py2)"/></svg>
  ),
  PHP: (
    <svg viewBox="0 0 32 32" width="28" height="28"><ellipse cx="16" cy="16" rx="14" ry="9" fill="#8892be"/><path d="M10.5 13h1.8l-.4 2h1.4c.9 0 1.5.2 1.8.5.3.3.4.8.2 1.5l-.5 2.2h-1.8l.5-2c.1-.3.1-.5 0-.6-.1-.1-.3-.2-.6-.2H12l-.6 2.8h-1.8l1-4.2zM16 13h3.2c.7 0 1.2.2 1.5.6.3.4.4.9.2 1.6-.2.7-.5 1.2-1 1.6-.5.4-1.1.5-1.9.5h-1.4l-.4 1.8h-1.8L16 13zm1.2 1.3l-.5 1.8h1.1c.3 0 .6-.1.8-.3.2-.2.3-.4.4-.7.1-.4 0-.6-.1-.7-.1-.1-.4-.1-.7-.1h-1zM4.5 13h3.2c.7 0 1.2.2 1.5.6.3.4.4.9.2 1.6-.2.7-.5 1.2-1 1.6-.5.4-1.1.5-1.9.5H5.1l-.4 1.8H2.9L4.5 13zm1.2 1.3l-.5 1.8h1.1c.3 0 .6-.1.8-.3.2-.2.3-.4.4-.7.1-.4 0-.6-.1-.7-.1-.1-.4-.1-.7-.1h-1z" fill="#fff"/></svg>
  ),
  "C++": (
    <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" fill="#00599c" rx="4"/><path d="M9.5 21.8c-3.3-1.9-3.3-6.8 0-8.7 1.6-.9 3.4-.9 4.9-.2l-.9 1.6c-1-.5-2.2-.5-3.1.1-2 1.2-2 4.4 0 5.6.9.5 2.1.5 3 0l.9 1.6c-1.5.8-3.3.8-4.8 0zm8.3-3.6h-1.3v1.3h-1.3v-1.3h-1.3v-1.3h1.3v-1.3h1.3v1.3h1.3v1.3zm4.4 0h-1.3v1.3h-1.3v-1.3h-1.3v-1.3h1.3v-1.3h1.3v1.3h1.3v1.3z" fill="#fff"/></svg>
  ),
  Vite: (
    <svg viewBox="0 0 32 32" width="28" height="28"><defs><linearGradient id="vg1" x1="6" y1="3" x2="16" y2="22" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#41d1ff"/><stop offset="100%" stopColor="#bd34fe"/></linearGradient><linearGradient id="vg2" x1="15" y1="3" x2="18" y2="21" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ff3e00"/><stop offset="100%" stopColor="#ffd300"/></linearGradient></defs><path d="M29 4.5L16.7 27.1c-.3.5-1 .5-1.3 0L3 4.5c-.3-.6.2-1.3.9-1.2l12.1 2.1 12.1-2.1c.7-.1 1.2.6.9 1.2z" fill="url(#vg1)"/><path d="M21.6 3.4l-5.6 1-5.6-1L16 17.6z" fill="url(#vg2)"/></svg>
  ),
  HTML5: (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M5 3l2.3 25.5L16 31l8.7-2.5L27 3H5z" fill="#e44d26"/><path d="M16 28.8V5.3H25.1l-1.9 21.4L16 28.8z" fill="#f16529"/><path d="M16 13.4h-4.3l-.3-3.4H16V6.7H7.8l.9 10h7.3v-.1zm.1 7.7l-3.6-1-.2-2.5H9l.4 4.6 6.6 1.8.1-.1v-3.8z" fill="#ebebeb"/><path d="M16 13.4v3.3h3.9l-.4 4.3-3.5 1v3.8l6.6-1.8L22 14l.1-1-6.1.4zm0-6.7v3.3h7.5l.2-2.5.2-1H16v.2z" fill="#fff"/></svg>
  ),
  CSS3: (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M5 3l2.3 25.5L16 31l8.7-2.5L27 3H5z" fill="#1572b6"/><path d="M16 28.8V5.3H25.1l-1.9 21.4L16 28.8z" fill="#33a9dc"/><path d="M16 13h4.4l.3-3.4H16V6.3H24.4l-.1.8-.9 9.8-.2 1.1H16V13zm.1 7.4l-.1.1-3.5-1-.2-2.5H9l.4 4.6 6.6 1.8v-3z" fill="#fff"/><path d="M16 13v3.3H12.3l-.3-3.3H16zm0-6.7v3.3h-8.3l-.3-3.3H16z" fill="#ebebeb"/></svg>
  ),
  React: (
    <svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="2.8" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="1.3"><ellipse cx="16" cy="16" rx="12" ry="4.8"/><ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(120 16 16)"/></g></svg>
  ),
  "React Native": (
    <svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="2.8" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="1.3"><ellipse cx="16" cy="16" rx="12" ry="4.8"/><ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(120 16 16)"/></g><text x="16" y="30" fontSize="4.5" fill="#61dafb" textAnchor="middle" fontFamily="Arial" fontWeight="bold">NATIVE</text></svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 7c-3.6 0-5.9 1.8-6.9 5.4 1.4-1.8 3-2.5 4.8-2 1 .3 1.8 1.1 2.6 2 1.3 1.4 2.9 3 5.9 3 3.6 0 5.9-1.8 6.9-5.4-1.4 1.8-3 2.5-4.8 2-1-.3-1.8-1.1-2.6-2C20.6 8.6 19 7 16 7zm-6.9 8c-3.6 0-5.9 1.8-6.9 5.4 1.4-1.8 3-2.5 4.8-2 1 .3 1.8 1.1 2.6 2 1.3 1.4 2.9 3 5.9 3 3.6 0 5.9-1.8 6.9-5.4-1.4 1.8-3 2.5-4.8 2-1-.3-1.8-1.1-2.6-2-1.3-1.4-2.9-3-5.9-3z" fill="#38bdf8"/></svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#3c873a"/><path d="M16 13c-.8 0-1.5.3-2 .9-.5.6-.7 1.3-.7 2.1 0 .8.2 1.5.7 2.1.5.6 1.2.9 2 .9s1.5-.3 2-.9c.5-.6.7-1.3.7-2.1 0-.8-.2-1.5-.7-2.1-.5-.6-1.2-.9-2-.9z" fill="#fff"/></svg>
  ),
  Express: (
    <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" fill="#1a1a1a" rx="4"/><text x="5" y="20" fontSize="10" fill="#fff" fontFamily="Arial" fontWeight="bold">ex</text><text x="16" y="20" fontSize="10" fill="#888" fontFamily="Arial">press</text></svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M17.2 3c0 0-3.3 3.5-3.3 9.3 0 3.7 1.9 6.2 1.9 6.2s-.5 8.5-.6 10.2c0 .4.3.6.6.5.3-.1.5-.4.5-.8-.2-1.7-.5-10.1-.5-10.1s1.9-2.5 1.9-6.1c0-5.7-3.3-9.3-3.3-9.3-.1-.2-.2-.1-.2.1z" fill="#47a248"/><path d="M16.9 4.5c.3.6 1.5 3.3 1.5 6.8 0 2.6-.8 4.3-1.4 5.3l-.6.9.2 9.4c0 .4-.3.6-.6.5-.3-.1-.5-.4-.5-.7l-.2-9.2-.5-.9c-.5-1-1.3-2.7-1.3-5.3 0-3.5 1.3-6.3 1.6-6.9.2-.3.5-.3.8.1z" fill="#3d8c40" opacity=".5"/></svg>
  ),
  MySQL: (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 4C9.4 4 4 8.2 4 13.5c0 3 1.8 5.7 4.7 7.5L7.5 26l4.8-2.5c1.2.3 2.4.5 3.7.5 6.6 0 12-4.2 12-9.5S22.6 4 16 4z" fill="#00758f"/><path d="M16 6c5.5 0 10 3.6 10 8s-4.5 8-10 8c-1.2 0-2.4-.2-3.5-.5L8 23.5l1.2-4.5C7 17.5 6 15.6 6 13.5 6 9.1 10.5 6 16 6z" fill="#f29111" opacity=".3"/><text x="9" y="17" fontSize="9" fill="#fff" fontFamily="Arial" fontWeight="bold">SQL</text></svg>
  ),
  Firebase: (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M7.3 26.1L10.8 5.3l5.6 9.9-9.1 10.9z" fill="#ffa000"/><path d="M14.9 13.5L12.4 8.2l12.3 17.9-9.8-12.6z" fill="#f57c00"/><path d="M7.3 26.1l17.4-2.6L14.9 13.5 10.8 5.3 7.3 26.1z" fill="#ffca28"/></svg>
  ),
  Laravel: (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M28.5 8.9L23.8 4.3c-.2-.2-.5-.3-.7-.3H12c-.3 0-.5.1-.7.3L4.2 11.5c-.2.2-.3.5-.3.7v13.5c0 .3.1.5.3.7l4.6 4.6c.2.2.5.3.7.3H23c.3 0 .5-.1.7-.3l4.6-4.6c.2-.2.3-.5.3-.7V9.6c.1-.3 0-.5-.1-.7zM21 16H17v-3h-2v3h-4v2h4v3h2v-3h4v-2z" fill="#ff2d20"/></svg>
  ),
  "VS Code": (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M23.5 4L13 14.3 7.7 9.7 4 11.5v9l3.7 1.8 5.3-4.6L23.5 28 28 25.6V6.4L23.5 4z" fill="#007acc"/><path d="M28 6.4l-4.5-2.4-11 11 11 11 4.5-2.4V6.4zM13 16L7.7 20.3 4 18.5v-5l3.7-1.8L13 16z" fill="#1ba8e0" opacity=".5"/></svg>
  ),
  GitHub: (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 3C8.8 3 3 8.8 3 16c0 5.8 3.8 10.7 9 12.4.7.1.9-.3.9-.6v-2.2c-3.7.8-4.5-1.8-4.5-1.8-.6-1.5-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.1 1.4 3.8 1.1.1-.8.5-1.4.9-1.7-2.9-.3-6-1.5-6-6.5 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.7.1-3.5 0 0 1.1-.3 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.6 3.5-1.3 3.5-1.3.7 1.8.2 3.2.1 3.5.8.9 1.3 2.1 1.3 3.5 0 5-3.1 6.2-6 6.5.5.4.9 1.2.9 2.4v3.6c0 .3.2.7.9.6C25.2 26.7 29 21.8 29 16c0-7.2-5.8-13-13-13z" fill="#fff"/></svg>
  ),
  Figma: (
    <svg viewBox="0 0 32 32" width="28" height="28"><rect x="9" y="3" width="7" height="7" rx="3.5" fill="#f24e1e"/><rect x="16" y="3" width="7" height="7" rx="3.5" fill="#ff7262"/><rect x="9" y="10" width="7" height="7" rx="3.5" fill="#a259ff"/><rect x="9" y="17" width="7" height="7" rx="3.5" fill="#1abcfe"/><circle cx="19.5" cy="20.5" r="3.5" fill="#0acf83"/></svg>
  ),
  Postman: (
    <svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="13" fill="#ff6c37"/><path d="M21 11.5l-7.8 7.8-2.6-2.6 7.8-7.8 2.6 2.6z" fill="#fff" opacity=".9"/><path d="M13.2 19.3l-2.6-2.6-1.1 3.7 3.7-1.1z" fill="#fff"/><circle cx="21" cy="11" r="2" fill="#fff" opacity=".7"/></svg>
  ),
  Expo: (
    <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" fill="#000" rx="6"/><path d="M6 22.5c3.6-7 5.4-10.5 6.2-11.5.8-1 1.6-1 2.1-1s1.1.4 1.6 1.2c.5.9 2 4 4.3 8.5l.6-1.1c-1.9-3.7-3.1-6-3.6-6.9-.8-1.5-1.8-2.2-3-2.2-1.3 0-2.3.7-3.1 2.2C10.3 13 8.4 16.7 5 23l1 .5.3-.5-.3.5z" fill="#fff"/><path d="M26 22.5c-3-5.8-4.6-9-5.2-10-.6-1.1-1.3-1.5-2-1.5-.6 0-1.2.4-1.7 1.2l-.5.9.9 1.7.5-.9c.3-.5.5-.7.8-.7.3 0 .5.1.8.6.5.9 2.2 4.2 5.1 9.7l.3.5 1-.5-.3-.5.3.5z" fill="#fff"/></svg>
  ),
  "Android Studio": (
    <svg viewBox="0 0 32 32" width="28" height="28"><path d="M21.5 6.5l2.1-3.7c.1-.2 0-.4-.2-.5s-.4 0-.5.2l-2.1 3.7C19.5 5.6 17.8 5 16 5s-3.5.6-4.8 1.2L9.1 2.5c-.1-.2-.3-.3-.5-.2s-.3.3-.2.5l2.1 3.7C8.2 8 6.5 10.5 6.5 13.5h19c0-3-1.7-5.5-4-7zm-9 4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm7 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#3ddc84"/><rect x="6" y="14" width="20" height="12" rx="2" fill="#3ddc84" opacity=".8"/><rect x="4" y="13" width="2" height="7" rx="1" fill="#3ddc84"/><rect x="26" y="13" width="2" height="7" rx="1" fill="#3ddc84"/><rect x="11" y="27" width="3" height="4" rx="1" fill="#3ddc84"/><rect x="18" y="27" width="3" height="4" rx="1" fill="#3ddc84"/></svg>
  ),
};

const SKILL_CATEGORIES = [
  {
    id: "languages",
    label: "Languages",
    icon: "{ }",
    color: "#f7df1e",
    glow: "rgba(247,223,30,0.15)",
    skills: ["JavaScript", "TypeScript", "Java", "Python", "PHP", "C++"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "◈",
    color: "#61dafb",
    glow: "rgba(97,218,251,0.15)",
    skills: ["Vite", "HTML5", "CSS3", "React", "React Native", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend & DB",
    icon: "⬡",
    color: "#47a248",
    glow: "rgba(71,162,72,0.15)",
    skills: ["Node.js", "Express", "MongoDB", "MySQL", "Firebase", "Laravel"],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    icon: "◎",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    skills: ["VS Code", "GitHub", "Figma", "Postman", "Expo", "Android Studio"],
  },
];

function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      t: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.t += s.speed;
        const op = 0.15 + Math.sin(s.t) * 0.15;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${op})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function SkillCard({ name, index, categoryColor, categoryGlow }) {
  const [hovered, setHovered] = useState(false);
  const logo = SKILL_LOGOS[name];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        padding: "14px 10px", borderRadius: 14,
        background: hovered ? categoryGlow : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? categoryColor + "66" : "rgba(255,255,255,0.07)"}`,
        cursor: "default", transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 8px 24px ${categoryColor}22` : "none",
        animation: `skillReveal 0.5s ease ${index * 0.06}s both`,
        minWidth: 80,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.25s",
        filter: hovered ? "drop-shadow(0 0 8px " + categoryColor + "88)" : "none",
      }}>
        {logo || (
          <span style={{ fontSize: 11, color: categoryColor, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span style={{
        fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 400,
        color: hovered ? "#fff" : "rgba(255,255,255,0.5)",
        textAlign: "center", lineHeight: 1.3, transition: "color 0.2s",
        letterSpacing: ".02em",
      }}>
        {name}
      </span>
    </div>
  );
}

export default function About() {
  const [activeCategory, setActiveCategory] = useState("languages");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const currentCat = SKILL_CATEGORIES.find(c => c.id === activeCategory);

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@300;400;500&display=swap');
        @keyframes skillReveal {
          from { opacity: 0; transform: translateY(12px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        @keyframes floatAvatar { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulseRing   { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.06);opacity:.2} }
        @keyframes glowPulse   { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes orbitDot    { from{transform:rotate(0deg) translateX(90px)} to{transform:rotate(360deg) translateX(90px)} }
        @keyframes scanH       { 0%{top:-2px} 100%{top:100%} }
        .cat-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 18px; border-radius: 40px; border: none; cursor: pointer;
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .06em;
          transition: all 0.2s ease; position: relative; overflow: hidden;
        }
        .cat-btn:hover { transform: translateY(-2px); }
        .skill-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
        }
        @media (max-width: 900px) {
          .skill-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .avatar-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(56,189,248,0.2);
          animation: pulseRing 3s ease-in-out infinite;
        }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent);
          animation: scanH 4s linear infinite; pointer-events: none;
        }
      `}</style>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column", overflow: "auto",
        background: "#060e1a", position: "relative", minHeight: 0,
      }}>
        <StarField />

        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(56,189,248,0.06),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(167,139,250,0.06),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, padding: "40px 48px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>

          {/* ── TOP: Avatar + Bio ── */}
          <div style={{ display: "flex", gap: 48, alignItems: "center", marginBottom: 52, flexWrap: "wrap", ...fade(0.1) }}>

            {/* Avatar col */}
            <div style={{ position: "relative", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 180, height: 180 }}>
              {/* Rings */}
              <div className="avatar-ring" style={{ inset: -18, animationDelay: "0s" }} />
              <div className="avatar-ring" style={{ inset: -34, animationDelay: "1s", borderStyle: "dashed", opacity: 0.15 }} />

              {/* Scan line inside avatar */}
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", zIndex: 3, pointerEvents: "none" }}>
                <div className="scan-line" />
              </div>

              {/* Orbiting dot */}
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                animation: "orbitDot 6s linear infinite", pointerEvents: "none", zIndex: 2,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }} />
              </div>

              <img
                src={avatar}
                alt="Mark Ranier Maestre"
                style={{
                  width: 160, height: 160, borderRadius: "50%",
                  objectFit: "cover", objectPosition: "top center",
                  border: "2px solid rgba(56,189,248,0.4)",
                  filter: "drop-shadow(0 0 20px rgba(56,189,248,0.3))",
                  animation: "floatAvatar 5s ease-in-out infinite",
                  position: "relative", zIndex: 1,
                }}
              />
            </div>

            {/* Bio col */}
            <div style={{ flex: 1, minWidth: 260 }}>
              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)",
                borderRadius: 20, padding: "4px 14px", marginBottom: 14,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8", animation: "glowPulse 1.5s infinite", display: "inline-block" }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#38bdf8", letterSpacing: ".1em" }}>ABOUT ME</span>
              </div>

              <h1 style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800,
                fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.1, marginBottom: 6,
                background: "linear-gradient(135deg,#fff 0%,#38bdf8 50%,#7dd3fc 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Mark Ranier Maestre
              </h1>

              <p style={{
                fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700,
                color: "rgba(56,189,248,0.7)", letterSpacing: ".12em", marginBottom: 18,
                textTransform: "uppercase",
              }}>
                Full Stack Developer
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                  4th Year BSIT student at{" "}
                  <span style={{ color: "rgba(56,189,248,0.8)", fontWeight: 400 }}>
                    Technological University of the Philippines — Taguig
                  </span>
                  , I build web and mobile applications and continuously learn new technologies to improve my skills.
                </p>
               
              </div>

              {/* Quick stats */}
              <div style={{ display: "flex", gap: 20, marginTop: 22, flexWrap: "wrap" }}>
                {[
    
                          ].map(s => (
                  <div key={s.label} style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 10, padding: "10px 18px", textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#38bdf8" }}>{s.val}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2, letterSpacing: ".06em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ ...fade(0.25), display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(56,189,248,0.3),transparent)" }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, color: "rgba(56,189,248,0.6)", letterSpacing: ".14em" }}>TECH STACK</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg,rgba(56,189,248,0.3),transparent)" }} />
          </div>

          {/* ── Category tabs ── */}
          <div style={{ ...fade(0.3), display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {SKILL_CATEGORIES.map(cat => {
              const active = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  className="cat-btn"
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    background: active ? cat.glow : "rgba(255,255,255,0.03)",
                    border: `1px solid ${active ? cat.color + "55" : "rgba(255,255,255,0.08)"}`,
                    color: active ? cat.color : "rgba(255,255,255,0.4)",
                    boxShadow: active ? `0 0 20px ${cat.color}22` : "none",
                  }}
                >
                  <span style={{ fontSize: 13 }}>{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* ── Skills grid ── */}
          <div style={{ ...fade(0.35) }}>
            <div key={activeCategory} className="skill-grid">
              {currentCat.skills.map((skill, i) => (
                <SkillCard
                  key={skill}
                  name={skill}
                  index={i}
                  categoryColor={currentCat.color}
                  categoryGlow={currentCat.glow}
                />
              ))}
            </div>
          </div>

          {/* ── Bottom flavor line ── */}
          <div style={{ ...fade(0.45), marginTop: 40, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 1, background: "rgba(56,189,248,0.3)" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: ".08em" }}>
              always learning · always building
            </span>
          </div>

        </div>
      </div>
    </>
  );
}