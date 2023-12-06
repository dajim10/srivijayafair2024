import anime from 'animejs';
import { motion } from 'framer-motion';

const Luckywheel = () => {
    const deg = 360 / 18;
    let rotation = 0;
    const rotate = () => {
        rotation += 360 - (rotation % 360);
        rotation += calRotation(8, deg, 3);

        let anim = anime({
            autoplay: false,
            targets: '#wheel',
            rotate: `${-rotation}deg`,
            duration: 3000,
            easing: 'easeOutElastic(1, .6)',
        });
        anim.play();
    };

    const calRotation = (index, degree, minTurn) => {
        const result = minTurn * 360 + index * degree;
        console.log(deg);
        console.log(result);
        return result;
    };

    return (
        <>
            <div className="box bg-red-600">
                <motion.button
                    className="border p-3"
                    whileHover={{
                        scale: 1.2,
                    }}
                    onClick={rotate}
                >
                    Spin
                </motion.button>
            </div>
            <div style={{ position: 'relative', height: '530px' }}>
                <div
                    id="wheel"
                    style={{
                        position: 'relative',
                        width: '500px',
                        height: '500px',
                        margin: '0 auto',
                        // background:
                        //     "url('https://4.bp.blogspot.com/-8XbToPks2p0/TxN_QMHMD0I/AAAAAAAABQo/yjRi_WOMgu0/s320/wheel+108+NUMBERED.jpg');",
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                        backgroundSize: '100%',
                    }}
                ></div>
                <div></div>
            </div>
        </>
    );
};

export default Luckywheel;
