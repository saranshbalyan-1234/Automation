import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
const Tracking = db.trackings;

const trackingByDate = async (req, res) => {
  await Tracking.schema(req.database)
    .findOne({
      where: { user_id: req.user.id, date: req.body.date },
    })
    .then((resp) => {
      if (!resp)
        return res.status(400).json({ error: ["No Tracking Data Found"] });
      if (resp) return res.status(200).json(JSON.parse(resp.data));
    })
    .catch((e) => {
      getError(e, res);
    });
};

export { trackingByDate };
