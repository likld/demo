document.addEventListener('DOMContentLoaded', () => {
    const heartButton = document.getElementById('heartButton');
    const heartContainer = document.getElementById('heartContainer');
    const blessings = document.querySelectorAll('.blessing');
    const bgMusic = document.getElementById('bgMusic');
    const snowContainer = document.querySelector('.snow-container');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');

    // 音频控制
    let isPlaying = false;
    let isMuted = false;

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            playPauseBtn.textContent = '播放音乐';
        } else {
            bgMusic.play();
            playPauseBtn.textContent = '暂停音乐';
        }
        isPlaying = !isPlaying;
    });

    muteBtn.addEventListener('click', () => {
        if (isMuted) {
            bgMusic.volume = 1;
            muteBtn.textContent = '静音';
        } else {
            bgMusic.volume = 0;
            muteBtn.textContent = '取消静音';
        }
        isMuted = !isMuted;
    });

    // 创建雪花
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.opacity = Math.random() * 0.5 + 0.5; // 增加不透明度
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.fontSize = Math.random() * 15 + 15 + 'px'; // 增加雪花大小
        snowContainer.appendChild(snowflake);

        // 动画结束后移除雪花
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    }

    // 持续创建雪花
    setInterval(createSnowflake, 100);

    // 点击按钮时创建爱心动画
    heartButton.addEventListener('click', (e) => {
        createHeart(e);
        // 每次点击时重新触发祝福语动画
        blessings.forEach((blessing, index) => {
            blessing.style.animation = 'none';
            blessing.offsetHeight; // 触发重排
            blessing.style.animation = `fadeInUp 0.5s ease-out forwards ${index * 0.2}s`;
        });
    });

    // 创建爱心动画
    function createHeart(e) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        heart.style.fontSize = '20px';
        heart.style.userSelect = 'none';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'heartFloat 2s ease-out forwards';
        heartContainer.appendChild(heart);

        // 2秒后移除爱心元素
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }

    // 添加鼠标移动时的背景效果
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.background = `
            linear-gradient(
                ${135 + x * 30}deg,
                #f5f7fa ${y * 50}%,
                #c3cfe2 100%
            )
        `;
    });

    // 添加键盘事件
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            createHeart({ clientX: randomX, clientY: randomY });
        }
    });
});

// 添加爱心浮动动画
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 