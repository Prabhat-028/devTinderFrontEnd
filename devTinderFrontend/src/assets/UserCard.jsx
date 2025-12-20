import React from "react";

const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, about } = user;

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div
                className="
          card 
          w-96 
          min-h-[520px] 
          bg-neutral-900 
          text-white 
          rounded-3xl 
          shadow-lg
          transition-all 
          duration-300 
          hover:-translate-y-2 
          hover:shadow-2xl 
          hover:shadow-purple-500/30
        "
            >
                {/* Image */}
                <figure className="h-72">
                    <img
                        src="https://tse1.mm.bing.net/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?cb=ucfimg2&ucfimg=1&w=1200&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3"
                        alt="Profile"
                        className="w-full h-full object-cover rounded-t-3xl"
                    />
                </figure>

                {/* Content */}
                <div className="card-body text-center px-6 py-6 space-y-3">
                    <h2 className="text-2xl font-bold tracking-wide">
                        {firstName} {lastName}
                    </h2>

                    <div className="text-sm text-gray-400">
                        {age && <span>Age: {age}</span>}
                        {age && gender && <span className="mx-2">•</span>}
                        {gender && <span>{gender}</span>}
                    </div>

                    {about && (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                            {about}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="card-actions justify-center mt-auto gap-4 pt-4">
                        <button className="btn btn-outline btn-error w-28">
                            Ignore
                        </button>
                        <button className="btn btn-primary w-28">
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
