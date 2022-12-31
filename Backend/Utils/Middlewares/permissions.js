const validatePermission = (permissionName, method) => {
  return async (req, res, next) => {
    try {
      if (!req.user.customerAdmin) {
        const allowed = await req.user.permissions.some((permission) => {
          return (
            permissionName == permission.name && permission[method] == true
          );
        });
        if (!allowed) return res.status(401).json({ error: "Unauthorized" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({ error: e });
    }
  };
};
export { validatePermission };
