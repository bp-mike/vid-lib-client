import Image from "next/image";

const OrderItem = ({ order }) => {
  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order Number: {order?.OrderNumber} </span>
            {order?.orderStatus == "Processing" ? (
              <span className="text-red-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="text-gray-500">{order?.createdAt?.substring(0, 10)} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Person</p>
          <ul className="text-gray-600">
            <li>{order?.userName}</li>
            <li>Phone: {order?.userPhone}</li>
            <li>Email: {order?.userEmail}</li>
          </ul>
        </div>
        {/* <div>
          <p className="text-gray-400 mb-1">Delivery address</p>
          <ul className="text-gray-600">
            <li>{order?.userName}</li>
            <li>Phone: {order?.userPhone}</li>
            <li>Email: {order?.userEmail}</li>
          </ul>
        </div> */}
        <div>
          <p className="text-gray-400 mb-1">Payment info</p>
          <ul className="text-gray-600"> 
          {/* //TODO payments table in backend */}
            <li>{order?.userName}</li>
            <li>Phone: {order?.userPhone}</li>
            <li>Email: {order?.userEmail}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.movies?.map((movie) => (
          <figure className="flex flex-row mb-4" key={movie.movieId}>
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={movie?.movieImageUrl ? movie?.movieImageUrl : "/images/default_movie.png"}
                  height="60"
                  width="60"
                  alt={movie.movieTitle}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{movie.movieTitle.substring(0, 35)}</p>
              <p className="mt-1 font-semibold">
                1x = ${movie.moviePrice}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
};

export default OrderItem;
