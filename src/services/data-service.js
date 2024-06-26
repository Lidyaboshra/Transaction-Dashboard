import http from "../http";
export const dataService = {
    getAll(endPoint, callback_success, callback_failure) {
        http.get(endPoint).then((response) => {
            if (response.status == 200) {
                callback_success(response.data);
            } else {
                callback_failure(response);
            }
        });
    },
};