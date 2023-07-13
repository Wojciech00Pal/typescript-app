// import React from 'react'

// function MainLoader() {
//   return (
//     <div 
//         style={{
//             position: "fixed",
//             top: "0",
//             left: "25%",
//             width: "100vh",
//             height: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//         }}
//     >
//         <div
//             className='spinner-border text-warning'
//             style={{
//                 width: "4rem",
//                 height:"4rem",
//             }}
//             >
//         </div>
//     </div>
//   )
// }

// export default MainLoader

import React from 'react';

function MainLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        className="spinner-border text-warning"
        style={{
          width: '4rem',
          height: '4rem',
        }}
      ></div>
    </div>
  );
}

export default MainLoader;