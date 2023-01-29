import {
    UPLOAD_IMAGE_THUMBNAILS,
    FETCH_IMAGE_THUMBNAILS,
    DELETE_IMAGE_THUMBNAILS,
    BLOCK_UPLOAD_THUMBNAIL,
    UNBLOCK_UPLOAD_THUMBNAIL,
} from '../constants';

export function upoadThumbnails({ data }) {
    return {
        type: UPLOAD_IMAGE_THUMBNAILS,
        data,
    };
}

export function fetchThumbnails(data) {
    return {
        type: FETCH_IMAGE_THUMBNAILS,
        data,
    };
}

export function deleteThumbnails({ data }) {
    return {
        type: DELETE_IMAGE_THUMBNAILS,
        data,
    };
}

export function blockVideoToUpload(id) {
    return {
        type: BLOCK_UPLOAD_THUMBNAIL,
        id,
    };
}

export function unBlockVideoToUpload(id) {
    return {
        type: UNBLOCK_UPLOAD_THUMBNAIL,
        id,
    };
}
