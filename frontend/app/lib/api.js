export async function refreshAccessToken() {
  try {
    const response = await fetch("http://127.0.0.1:8000/refresh", {
      method: "POST",
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function fetchWithRefresh(url, options = {}) {
  const baseOptions = {
    credentials: "include",
    ...options,
  };

  let response;

  try {
    response = await fetch(url, baseOptions);
  } catch (error) {
    window.location.href = "/login";
    throw error;
  }

  if (response.status === 401 || response.status === 403) {
    const refreshed = await refreshAccessToken();

    if (!refreshed) {
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    response = await fetch(url, baseOptions);
  }

  return response;
}