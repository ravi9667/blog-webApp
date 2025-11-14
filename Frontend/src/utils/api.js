export const apiCall = async (url, method = "GET", body = null) => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/";
        return;
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : null
        });

        const data = await response.json();

        if (
            data.message === "invalid or Expired token" ||
            data.message === "to token provided"
        ) {
            localStorage.removeItem("token");
            window.location.href = "/";
            return;
        }

        return data;

    } catch (err) {
        console.error("API Error:", err);
        return { ok: false };
    }
};
