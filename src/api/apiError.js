const ERROR_MESSAGES = {
  invalid_credentials: "Неверный логин или пароль",
  weak_password: "Пароль слишком простой",
  user_already_exists: "Пользователь уже существует",
  network_error: "Нет соединения",
  unknown_error: "Неизвестная ошибка",
};

export function apiError(error) {
  if (!error.response) {
    return {
      status: null,
      code: "network_error",
      message: ERROR_MESSAGES.network_error,
    };
  }

  const { status, data } = error.response;

  const code = data?.error_code ?? "unknown_error";

  return {
    status,
    code,
    message: ERROR_MESSAGES[code] ?? data?.msg ?? ERROR_MESSAGES.unknown_error,
  };
}
