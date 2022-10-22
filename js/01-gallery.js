import { galleryItems } from './gallery-items.js';

const galleryParentEl = document.querySelector('.gallery');

class Gallery { 
    constructor(galleryItems, galleryParentEl) { 
        this.galleryItems = galleryItems;
        this.galleryParentEl = galleryParentEl;
    }

    init() { 
        const galleryEls = this.galleryItems.map(this.makeGalleryItem).join('');
        this.galleryParentEl.insertAdjacentHTML('beforeend', galleryEls);
    }

    makeGalleryItem({ preview, original, description }) {
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
}

new Gallery(galleryItems, galleryParentEl).init();

galleryParentEl.addEventListener('click', onPreviewImgClick);

function onPreviewImgClick(event) { 
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    openOriginalImgModally(event);
}

function openOriginalImgModally(event) {
    const original = event.target.dataset.source;
    const description = event.target.alt;

    event.preventDefault();
    
    const modal = basicLightbox.create(
        `<div class="modal">
            <img
                src='${original}'
                alt='${description}'
            />
        </div>`,
        {
            onClose: () => {
                window.removeEventListener('keydown', onEscKeyDown);
            },
        }
    );

    modal.show(window.addEventListener('keydown', onEscKeyDown));

    function onEscKeyDown(event) {
        if (event.code === 'Escape') {
            modal.close();
        }
    }
}

