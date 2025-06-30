import React from 'react';
import Vinyl from './components/vinyl';
import Collection from './components/collection';

const ArchivePage: React.FC = () => {

    return (
        <div className="flex flex-col">
            
            <Collection>
                {(covers) =>
                    covers.map((cover, idx) => (
                        <Vinyl
                            key={cover.id || idx}
                            id={cover.id ? cover.id.toString() : `vinyl-${idx}`}
                            coverSrc={cover.artCover}
                            vinylSrc={'/vinyl.png'}
                            audioSrc={cover.url}
                            title={cover.Title}
                            artist={cover.Artist}
                        />
                    ))
                }
            </Collection>
        </div>
    );
};


export default ArchivePage;
