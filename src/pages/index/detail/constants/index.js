// 解析数据
export function formatModuleData(module_id, programData) {
  /**
   * indexs[0] session index
   * indexs[1] module index
   */
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
    sessionIndex: indexs[0],

    moduleData: moduleItem,
    moduleId: module_id,
    moduleIndex: indexs[1],

    paperformId: moduleItem.PFKey,
  };
}
