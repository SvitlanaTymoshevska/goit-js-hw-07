import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryParentEl = document.querySelector('.gallery');

const galleryEls = galleryItems.map(makeGalleryItem).join('');

function makeGalleryItem({ preview, original, description }) {
    const itemEl = `<div class="gallery__item">
                        <a class="gallery__link" href=${original}>
                            <img
                            class="gallery__image"
                            src=${preview}
                            data-source=${original}
                            alt=${description}
                            />
                        </a>
                    </div>`;
    return itemEl;
}

function onPreviewImgClick(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    
    openOriginalImgModally(event);
}

function openOriginalImgModally(event) {
    event.preventDefault();

    const instance = basicLightbox.create(`
        <div class="modal">
            <img src='${event.target.dataset.source}'/>
        </div>
    `);
    instance.show();
}

galleryParentEl.insertAdjacentHTML('beforeend', galleryEls);

galleryParentEl.addEventListener('click', onPreviewImgClick);