'use strict'
function login(userList, $payload) {

}

function unlogin(currentUser, $payload) {
    currentUser = undefined;
    return {
        currentUser
    }
}

function register(userList, $payload) {

}
function isLogin(currentUser) {
    if (currentUser && currentUser.name) {
        return {
            loginState: {
                isLogined: true
            }
        }
    }
    return {
        loginState: {
            isLogined: false
        }
    }
}
function addFav($payload, $persist) {
    let payload = $payload();
    let fav = [{
        user_id: payload.user_id,
        content_id: payload.content_id,
        content_type: payload.content_type,
    }];
    $persist('fav', {
        data: fav
    });
    return {
        fav: {
            data: fav
        }
    }
}
function removeFav($payload, $persist) {
    let payload = $payload();
    let fav = [{
        id: payload.fav_id,
        itemRemove: true
    }];
    $persist('fav', {
        data: fav
    });
    return {
        fav: {
            data: fav
        }
    }
}

function getFav(fav) {
    return {
        fav
    }
}
function getCollection(collection) {
    return {
        collection
    }

}
function getCollectionList(collectionList) {
    return {
        collectionList
    }
}
function createCollection($payload, $persist) {
    let payload = $payload();
    let collection = {
        name: payload.collectionName,
        user_id: payload.user_id || 1,
        cover: '',
        bookmark: ''
    }
    $persist('collectionList', [
        collection
    ]);
    return {
        collectionList: [
            collection
        ]
    }
}
function removeCollection($persist, $payload) {
    let payload = $payload();
    let list = payload.map(id => {
        return {
            id: id,
            itemRemove: true
        }
    });
    $persist('collectionList', list);
    return {

    }

}
function updateCollection() {

}
export default {
    login,
    unlogin,
    register,
    isLogin,
    addFav,
    removeFav,
    getFav,
    getCollection,
    removeCollection,
    updateCollection,
    getCollectionList,
    createCollection
}