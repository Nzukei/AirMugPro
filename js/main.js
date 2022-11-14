(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 씬(scroll-section)
    let enterNewScene = false; // 새로운 scene이 시작된 순간 true

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5,   // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),

                messageFirst: document.querySelector('#scroll-section-0 .main-message.first'),
                messageSecond: document.querySelector('#scroll-section-0 .main-message.second'),
                messageThird: document.querySelector('#scroll-section-0 .main-message.third'),
                messageFourth: document.querySelector('#scroll-section-0 .main-message.fourth'),
            },
            values: {
                messageFirst_opacity_start: [0, 1, {start: 0.1, end: 0.2}],
                messageSecond_opacity_start: [0, 1, {start: 0.3, end: 0.4}],
                messageThird_opacity_start: [0, 1, {start: 0.5, end: 0.6}],
                messageFourth_opacity_start: [0, 1, {start: 0.7, end: 0.8}],

                messageFirst_translateY_start: [20, 0, {start: 0.1,  end: 0.2}],
                messageSecond_translateY_start: [20, 0, {start: 0.3,  end: 0.4}],
                messageThird_translateY_start: [20, 0, {start: 0.5,  end: 0.6}],
                messageFourth_translateY_start: [20, 0, {start: 0.7,  end: 0.8}],

                messageFirst_opacity_end: [1, 0, {start: 0.25, end: 0.3}],
                messageSecond_opacity_end: [1, 0, {start: 0.45, end: 0.5}],
                messageThird_opacity_end: [1, 0, {start: 0.65, end: 0.7}],
                messageFourth_opacity_end: [1, 0, {start: 0.85, end: 0.9}],

                messageFirst_translateY_end: [0, -20, {start: 0.25, end: 0.3}],
                messageSecond_translateY_end: [0, -20, {start: 0.45, end: 0.5}],
                messageThird_translateY_end: [0, -20, {start: 0.65, end: 0.7}],
                messageFourth_translateY_end: [0, -20, {start: 0.85, end: 0.9}]
            }
        },
        {
            //1
            type: 'normal',
            /* heightNum: 5, type normal에서는 필요 없음 */
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
                content: document.querySelector('#scroll-section-1 .description')
            }
        },
        {
            //2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),

                messageFirst: document.querySelector('#scroll-section-2 .first'),
                messageSecond: document.querySelector('#scroll-section-2 .second'),
                messageThird: document.querySelector('#scroll-section-2 .third'),

                pinSecond: document.querySelector('#scroll-section-2 .second .pin'),
                pinThird: document.querySelector('#scroll-section-2 .third .pin')
            },
            values: {
                messageFirst_translateY_start: [20, 0, { start: 0.15, end: 0.2 }],
                messageSecond_translateY_start: [30, 0, { start: 0.5, end: 0.55 }],
                messageThird_translateY_start: [30, 0, { start: 0.72, end: 0.77 }],

                messageFirst_opacity_start: [0, 1, { start: 0.15, end: 0.2 }],
                messageSecond_opacity_start: [0, 1, { start: 0.5, end: 0.55 }],
                messageThird_opacity_start: [0, 1, { start: 0.72, end: 0.77 }],

                messageFirst_translateY_end: [0, -20, { start: 0.3, end: 0.35 }],
                messageSecond_translateY_end: [0, -20, { start: 0.58, end: 0.63 }],
                messageThird_translateY_end: [0, -20, { start: 0.85, end: 0.9 }],

                messageFirst_opacity_end: [1, 0, { start: 0.3, end: 0.35 }],
                messageSecond_opacity_end: [1, 0, { start: 0.58, end: 0.63 }],
                messageThird_opacity_end: [1, 0, { start: 0.85, end: 0.9 }],

                pinSecond_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinThird_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],

                pinSecond_opacity_start: [0, 1, { start: 0.5, end: 0.55 }],
                pinThird_opacity_start: [0, 1, { start: 0.72, end: 0.77 }],

                pinSecond_opacity_end: [1, 0, { start: 0.58, end: 0.63 }],
                pinThird_opacity_end: [1, 0, { start: 0.85, end: 0.9 }]
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption')
            },
            values: {

            }
        }
    ];

    function setLayout() {
        /* 각 스크롤 섹션의 높이 세팅 */
        for (let i = 0; i < sceneInfo.length; ++i) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * document.documentElement.clientHeight;
            } else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; ++i) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else  if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:
                if (scrollRatio <= 0.22) {
                    /* in */
                    objs.messageFirst.style.opacity = calcValues(values.messageFirst_opacity_start, currentYOffset);
                    objs.messageFirst.style.transform = `translate3d(0, ${calcValues(values.messageFirst_translateY_start, currentYOffset)}%, 0)`;
                } else {
                    /* out */
                    objs.messageFirst.style.opacity = calcValues(values.messageFirst_opacity_end, currentYOffset);
                    objs.messageFirst.style.transform = `translate3d(0, ${calcValues(values.messageFirst_translateY_end, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.42) {
                    /* in */
                    objs.messageSecond.style.opacity = calcValues(values.messageSecond_opacity_start, currentYOffset);
                    objs.messageSecond.style.transform = `translate3d(0, ${calcValues(values.messageSecond_translateY_start, currentYOffset)}%, 0)`;
                } else {
                    /* out */
                    objs.messageSecond.style.opacity = calcValues(values.messageSecond_opacity_end, currentYOffset);
                    objs.messageSecond.style.transform = `translate3d(0, ${calcValues(values.messageSecond_translateY_end, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.62) {
                    /* in */
                    objs.messageThird.style.opacity = calcValues(values.messageThird_opacity_start, currentYOffset);
                    objs.messageThird.style.transform = `translate3d(0, ${calcValues(values.messageThird_translateY_start, currentYOffset)}%, 0)`;
                } else {
                    /* out */
                    objs.messageThird.style.opacity = calcValues(values.messageThird_opacity_end, currentYOffset);
                    objs.messageThird.style.transform = `translate3d(0, ${calcValues(values.messageThird_translateY_end, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82) {
                    /* in */
                    objs.messageFourth.style.opacity = calcValues(values.messageFourth_opacity_start, currentYOffset);
                    objs.messageFourth.style.transform = `translate3d(0, ${calcValues(values.messageFourth_translateY_start, currentYOffset)}%, 0)`;
                } else {
                    /* out */
                    objs.messageFourth.style.opacity = calcValues(values.messageFourth_opacity_end, currentYOffset);
                    objs.messageFourth.style.transform = `translate3d(0, ${calcValues(values.messageFourth_translateY_end, currentYOffset)}%, 0)`;
                }

                break;

            case 2:
                // console.log('2 play');
                if (scrollRatio <= 0.25) {
                    // in
                    objs.messageFirst.style.opacity = calcValues(values.messageFirst_opacity_start, currentYOffset);
                    objs.messageFirst.style.transform = `translate3d(0, ${calcValues(values.messageFirst_translateY_start, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageFirst.style.opacity = calcValues(values.messageFirst_opacity_end, currentYOffset);
                    objs.messageFirst.style.transform = `translate3d(0, ${calcValues(values.messageFirst_translateY_end, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.565) {
                    // in
                    objs.messageSecond.style.transform = `translate3d(0, ${calcValues(values.messageSecond_translateY_start, currentYOffset)}%, 0)`;
                    objs.messageSecond.style.opacity = calcValues(values.messageSecond_opacity_start, currentYOffset);
                    objs.pinSecond.style.transform = `scaleY(${calcValues(values.pinSecond_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageSecond.style.transform = `translate3d(0, ${calcValues(values.messageSecond_translateY_end, currentYOffset)}%, 0)`;
                    objs.messageSecond.style.opacity = calcValues(values.messageSecond_opacity_end, currentYOffset);
                    objs.pinSecond.style.transform = `scaleY(${calcValues(values.pinSecond_scaleY, currentYOffset)})`;
                }

                if (scrollRatio <= 0.81) {
                    // in
                    objs.messageThird.style.transform = `translate3d(0, ${calcValues(values.messageThird_translateY_start, currentYOffset)}%, 0)`;
                    objs.messageThird.style.opacity = calcValues(values.messageThird_opacity_start, currentYOffset);
                    objs.pinThird.style.transform = `scaleY(${calcValues(values.pinThird_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageThird.style.transform = `translate3d(0, ${calcValues(values.messageThird_translateY_end, currentYOffset)}%, 0)`;
                    objs.messageThird.style.opacity = calcValues(values.messageThird_opacity_end, currentYOffset);
                    objs.pinThird.style.transform = `scaleY(${calcValues(values.pinThird_scaleY, currentYOffset)})`;
                }

                break;

            case 3:
                break;
        }
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; ++i) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            if(currentScene < sceneInfo.length-1) {
                currentScene++;
            }
        }

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return; // 브라우저가 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`);

        if (enterNewScene) return;

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    // window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

})();