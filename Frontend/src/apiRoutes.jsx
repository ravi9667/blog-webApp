// const getToken = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     return token;
// }

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
