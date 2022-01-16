import OverlayScrollbars from 'overlayscrollbars';

const instance = OverlayScrollbars(document.querySelector('html'), {});

instance.scroll({
	y: '100% / 2',
});
