import { difference } from "lodash";
export const getDetailsEditedLogs = async (oldData, newData, name = "") => {
  //   console.log("saransh", oldData, newData);
  let messages = [];
  await Object.keys(oldData).forEach((key) => {
    if (key === "name" || key === "description" || key === "tags")
      if (oldData[key] !== newData[key]) {
        if (key === "tags") {
          const tagDifference = difference(oldData["tags"], newData["tags"]);
          (tagDifference.length > 0 ||
            oldData["tags"]?.length !== newData["tags"]?.length) &&
            messages.push(
              `updated the ${name}${key} from "${oldData[key]}" to "${newData[
                key
              ].join(", ")}"`
            );
        } else
          messages.push(
            `updated the ${name}${key} from "${oldData[key]}" to "${newData[key]}"`
          );
      }
  });
  return messages;
};
