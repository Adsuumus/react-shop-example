import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h2>Страница не существует</h2>
        <NavLink to="/">Вернуться на главную</NavLink>
      </div>
    </div>
  );
}

export { NotFound };
