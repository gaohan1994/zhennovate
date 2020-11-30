// 解析数据
export function formatModuleData(module_id, programData) {
  let indexs = [];
  programData.Sessions?.forEach((s, sindex) => {
    const token = s.Modules?.findIndex((m) => {
      return m._id === module_id;
    });

    if (token > -1) {
      indexs = [sindex, token];
    }
  });
  const session = programData.Sessions[indexs[0]];
  const moduleItem = session.Modules[indexs[1]];

  return {
    program: programData,
    programId: programData._id,

    session: session,
    sessionId: session._id,

    moduleData: moduleItem,
    moduleId: module_id,

    paperformId: moduleItem.PFKey,
  };
}
