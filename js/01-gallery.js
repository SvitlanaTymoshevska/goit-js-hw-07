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
        this.galleryParentEl.addEventListener('click', this.onPreviewImgClick.bind(this));
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

    onPreviewImgClick(event) { 
        if (event.target.nodeName !== 'IMG') {
            return;
        }
    
        this.openOriginalImgModally(event);
    }

    openOriginalImgModally(event) {
        const original = event.target.dataset.source;
        const description = event.target.alt;

        event.preventDefault();
        
        this.modal = basicLightbox.create(
            `<div class="modal">
                <img
                    src='${original}'
                    alt='${description}'
                />
            </div>`,
            {
                onClose: () => window.removeEventListener('keydown', this.onEscKeyDown.bind(this))
            },
        );

        this.modal.show(window.addEventListener('keydown', this.onEscKeyDown.bind(this)));
    }

    onEscKeyDown(event) {
        if (event.code === 'Escape') {
            this.modal.close();
        }
    }
}

new Gallery(galleryItems, galleryParentEl).init();