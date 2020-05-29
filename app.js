const express = require("express");
const Playlist = require("./models/playlist");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const bodyParser = require("body-parser");
// const sequelize = require("./database/sequelize");

const Artist = require("./models/artist");
const Album = require("./models/album");
const Track = require("./models/track");
const Test = require("./test");

const app = express();
app.use(bodyParser.json());
//artist - album
Artist.hasMany(Album, {
  foreignKey: "artistId"
});
Album.belongsTo(Artist, {
  foreignKey: "artistId"
});

//playlist - track
Playlist.belongsToMany(Track, {
  through: "playlist_track",
  foreignKey: "PlaylistId",
  timestamps: false
});
Track.belongsToMany(Playlist, {
  through: "playlist_track",
  foreignKey: "trackId",
  timestamps: false
});
//playlist

app.get("/api/playlists", (req, res) => {
  let filter = {};
  let { q } = req.query;
  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Playlist.findAll(filter).then(playlists => {
    res.json(playlists);
  });
// sequelize.query("Select * from playlists").then((playlists)=>{
//     res.json(playlists)
// })
});
app.get("/api/playlists/:id", (req, res) => {
  let id = req.params.id;

  Playlist.findByPk(id, {
    include: [Track]
  }).then(playlist => {
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send();
    }
  })
});
app.delete("/api/playlists/:id", (req, res) => {
    console.log(req.params)
  let { id } = req.params;
  Playlist.findByPk(id)
  .then(playlist => {
      console.log(playlist)
    if(playlist){      
        playlist.setTracks([]).then(() => {
            playlist.destroy().then(() => {
              res.status(204).send(); 
            });
          });
    }
    else{
        res.status(404).json();
    }
  })  
});
//artist

app.post("/api/artists", (req, res) => {
  Test.create({
    name: req.body.name
  })
    .then(artist => {
      res.json(artist);
    })
    .catch(error => {
      console.log(error);
      res.status(422).json({
        errors: error.errors.map(error => {
          return {
            attribute: error.path,
            message: error.message
          };
        })
      });
    });
});

app.get("/api/artists", (req, res) => {
  let filter = {};
  let { q } = req.query;
  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Artist.findAll(filter).then(artists => {
    res.json(artists);
  });
});

app.get("/api/artists/:id", (req, res) => {
  let id = req.params.id;

  Artist.findByPk(id, {
    include: [Album]
  }).then(artist => {
    if (artist) {
      res.json(artist);
    } else {
      res.send("Not found!");
    }
  });
});

//album

app.get("/api/albums", (req, res) => {
  let filter = {};
  let { q } = req.query;
  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Album.findAll(filter).then(albums => {
    res.json(albums);
  });
});

app.get("/api/albums/:id", (req, res) => {
  let id = req.params.id;

  Album.findByPk(id, {
    include: [Artist]
  }).then(album => {
    if (album) {
      res.json(album);
    } else {
      res.send("Not found!");
    }
  });
});

//track
app.get("/api/tracks", (req, res) => {
  let filter = {};
  let { q } = req.query;
  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Track.findAll(filter).then(tracks => {
    res.json(tracks);
  });
});

app.get("/api/tracks/:id", (req, res) => {
  let id = req.params.id;

  Track.findByPk(id, {
    include: [Playlist]
  }).then(track => {
    if (track) {
      res.json(track);
    } else {
      res.send("Not found!");
    }
  });
});

app.listen(3000);
