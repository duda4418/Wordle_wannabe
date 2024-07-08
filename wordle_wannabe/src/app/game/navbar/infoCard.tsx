// components/Card.js
const Card = ({ letter, color }:any) => {
    return (
      <div className="card bg-gray-200 rounded-lg w-10 h-10 m-1 flex items-center justify-center text-xl font-bold">
        {letter}
      </div>
    );
  };
  
  export default Card;
  