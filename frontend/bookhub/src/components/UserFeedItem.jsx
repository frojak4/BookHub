import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

const UserFeedItem = ({entry}) => {

    const moment = require('moment')
    const [time, setTime] = useState(moment(new Date(entry.Date)).fromNow());
    


  return (
    <div className="flex flex-col border-b-2 border-slate-600">
        <h3 className="text-slate-400">
            {entry.ReadingStatus === 'Done' && 
            <div>
                <div className="text-sm text-slate-500 flex justify-end m-0">
                    <h3 className="mx-2">{time}</h3>
                </div>
                <h3 className="px-3 pb-3">
                    <span className="text-white">
                        <Link to={`/user/${entry.username}`}>{entry.username}</Link>
                        </span> read <span className="text-white">
                            <Link to={`/books/${entry.GoogleID[0]}`}>{entry.Title}</Link>
                            </span>
                    {entry.Score && ` and gave it a ${entry.Score}/10`}</h3>
            </div>
            }
            {entry.ReadingStatus === 'Reading' && 
            <div>
            <div className="text-sm text-slate-500 flex justify-end m-0">
                <h3 className="mx-2">{time}</h3>
            </div>
            <h3 className="px-3 pb-3">
                <span className="text-white">
                <Link to={`/user/${entry.username}`}>{entry.username}</Link>
                    </span> is currently reading <span className="text-white">
                    <Link to={`/books/${entry.GoogleID[0]}`}>{entry.Title}.</Link>
                        </span>
                </h3>
            </div>
            }
            {entry.ReadingStatus === 'Want to Read' && 
            <div>
            <div className="text-sm text-slate-500 flex justify-end m-0">
                <h3 className="mx-2">{time}</h3>
            </div>
            <h3 className="px-3 pb-3">
                <span className="text-white">
                <Link to={`/user/${entry.username}`}>{entry.username}</Link>
                    </span> wants to read <span className="text-white">
                    <Link to={`/books/${entry.GoogleID[0]}`}>{entry.Title}.</Link>
                        </span>
                </h3>
            </div>
            }
        </h3>
    </div>
  )
}

export default UserFeedItem