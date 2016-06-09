import NProgress from "nprogress";

export default (history) => {
    history.listenBefore(() => {
        NProgress.start();
    });

    history.listen(() => {
        NProgress.done();
    });
};
