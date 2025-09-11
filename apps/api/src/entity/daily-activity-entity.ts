import { BaseEntity } from "./base-entity";
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { UserEntity } from "./user-entity";
import {type Meal} from "@one-step/common/dto/daily-dashboard/meal";
import {type SideQuest} from "@one-step/common/dto/daily-dashboard/side-quest";



@Entity({ tableName: "daily_activities" })
export class DailyActivityEntity extends BaseEntity {
  @Property({ type: "date" })
  date!: string;

  @Property({ nullable: true })
  dailyGoal?: string;

  @Property({ default: false, nullable: false })
  dailyGoalCompleted!: boolean;

  @Property({ type: "jsonb", default: "[]", nullable: false })
  meals!: Meal[];

  @Property({ type: "jsonb", default: "[]", nullable: false })
  sideQuests!: SideQuest[];

  @ManyToOne({ entity: () => UserEntity, fieldName: "userId", nullable: false })
  user!: UserEntity;

  userId!: string;
}
