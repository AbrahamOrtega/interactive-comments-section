import data from "../data.json";

const getComments = () => {
    return data.comments;
}
const getCurrentUser = () => {
    return data.currentUser;
};

export { getComments, getCurrentUser };