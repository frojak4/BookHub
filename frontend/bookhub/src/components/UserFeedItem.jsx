import React from 'react'
import {Link} from 'react-router-dom';

const UserFeedItem = ({entry}) => {
  return (
    <div className="flex flex-col border-b-2 border-slate-600 p-3">
        <h3 className="text-slate-400">
            {entry.ReadingStatus === 'Done' && 
            <h3>
                <span className="text-white">
                    <Link to={`/user/${entry.username}`}>{entry.username}</Link>
                    </span> read <span className="text-white">
                        <Link to={`/books/${entry.GoogleID[0]}`}>{entry.Title}</Link>
                        </span>
                {entry.Score && ` and gave it a ${entry.Score}/10`}</h3>
            }
            {entry.ReadingStatus === 'Reading' && 
            <h3>
                <span className="text-white">
                <Link to={`/user/${entry.username}`}>{entry.username}</Link>
                    </span> is currently reading <span className="text-white">
                    <Link to={`/books/${entry.GoogleID[0]}`}>{entry.Title}.</Link>
                        </span>
                </h3>
            }
            {entry.ReadingStatus === 'Want to Read' && 
            <h3>
                <span className="text-white">
                <Link to={`/user/${entry.username}`}>{entry.username}</Link>
                    </span> wants to read <span className="text-white">
                    <Link to={`/books/${entry.GoogleID[0]}`}>{entry.Title}.</Link>
                        </span>
                </h3>
            }
        </h3>
    </div>
  )
}

export default UserFeedItem