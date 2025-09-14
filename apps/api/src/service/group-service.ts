import { CreateGroupDto } from "@one-step/common/dto/group/create-group-dto";
import { GroupEntity } from "../entity/group-entity";
import { groupRepo } from "../repo/group-repo";
import { UserInGroupEntity } from "../entity/user-in-group-entity";
import { UserInGroupRole } from "../enum/user-in-group-role";
import { UserInGroupStatus } from "../enum/user-in-group-status";
import { userInGroupRepo } from "../repo/user-in-group-repo";
import { getUserInSession } from "../util/session-util";
import { NotFoundError } from "../util/error";

export const createGroup = async (params: CreateGroupDto) => {
  const group = new GroupEntity(params);
  groupRepo().save(group);

  const userInGroup = new UserInGroupEntity();
  userInGroup.user = getUserInSession();
  userInGroup.group = group;
  userInGroup.role = UserInGroupRole.ADMIN;
  userInGroup.status = UserInGroupStatus.ACTIVE;
  userInGroupRepo().save(userInGroup);

  return group;
};

export const getGroupById = async (id: string) => {
  const userInGroup = await userInGroupRepo().findOne({
    group: { id },
    user: { id: getUserInSession().id },
  });
  if (!userInGroup) throw new NotFoundError(`Group ${id} not found`);
  return userInGroup.group;
};
