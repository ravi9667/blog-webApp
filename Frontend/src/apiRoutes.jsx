const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token;
}

// this is for Example
// export const getData = async (route, queryParams) => {
//     const token = getToken();
//     try {
//         const res = await fetch(`${route}${queryParams ? `?${queryParams}` : ''}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = await res.json();
//         if (data.ok) {
//             return data;
//         }
//     } catch (err) {
//         console.log("Fetch user error:", err);
//         return err;
//     }
// }

// Login and signup api
export const postRequest = async (route, bodyData) => {
    try {
        const res = await fetch(`${route}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData),
        });

        const data = await res.json();
        return data;

    } catch (err) {
        console.log("POST API Error:", err);
        return { ok: false, message: "Something went wrong" };
    }
};

// Universal GET request function
export const getRequest = async (route, auth = false) => {
    try {
        const headers = {};

        if (auth) {
            const token = getToken();
            if (!token) return { ok: false, message: "No token found" };
            headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(route, { headers });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("GET Error:", err);
        return { ok: false, message: "Something went wrong" };
    }
};

// PATCH request
export const patchData = async (route, body = {}) => {
    const token = getToken();

    try {
        const res = await fetch(route, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("PATCH API Error:", err);
        return { ok: false, message: "Something went wrong" };
    }
};

// DELETE request
export const deleteData = async (route, body = {}) => {
    const token = getToken();

    try {
        const res = await fetch(route, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("DELETE API Error:", err);
        return { ok: false, message: "Something went wrong" };
    }
};