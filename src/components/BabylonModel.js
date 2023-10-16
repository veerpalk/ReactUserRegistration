import { Canvas, ambientLight, directionalLight } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, Environment } from "@react-three/drei";

function Model(props) {
    const { scene } = useGLTF("assets/Logo.glb");
    return <primitive object={scene} {...props} />
}

export default function BabylonModel() {
    return (
        <div className="App">
            <div className="App-header" style={{ height: '0px', width: '0px',position:'relative'}}>
             <Canvas
                    dpr={[1, 2]}
                    shadows 
                    camera={{ fov: 45, position: [0, 0, 5] }}
                    style={{ position: "absolute", top: 0, left: 0,right:0, height: '150px', width: '330px' }}
                    >
                    {/* <color attach="background" args={['#E66448']} /> */}

                    <ambientLight intensity={5} />

                    <hemisphereLight 
                        skyColor={"#ffffff"} 
                        groundColor={"#ffffff"} 
                        intensity={5}
                    />  
                    {/* Add a point light for universal lighting */}
                    <pointLight position={[0, 2, 0]} intensity={5} />
                                    
                    <directionalLight 
                        position={[0,5,5]} 
                        intensity={5}
                        castShadow
                    />
                    <directionalLight 
                        position={[-5, 6, -5]} 
                        intensity={3}
                    />
                    <PresentationControls
                        speed={1.5}
                        globalZoom={0.5}
                        polar={[-0.1, Math.PI / 4]}
                    >
                        <Stage environment={null}>
                            {/* Adding an environment for light reflection */}
                            {/* <Environment files="assets/background.hdr" background/> */}
                            {/* <Environment preset="sunset"
                                path="assets"  // path to the folder containing image
                                files={['background.jpg']} // names of your images
                                background
                            /> */}

                            <Model scale={1} />
                        </Stage>
                    </PresentationControls>
                </Canvas>
            </div>
        </div>
    );
}
