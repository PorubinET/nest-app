import {BelongsTo, ForeignKey, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";


interface UserCreationAttrs {
    // поля, которые нужны для создания лбъекта из этого класса
    email: string;
    password: string;
}

@Table({tableName: 'users'})

// User\UserCreationAttrs дженерики класса User
export class User extends Model<User, UserCreationAttrs> {
    // описываем модель данных в bd

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    // @BelongsToMany(() => Role, () => UserRoles)
    // roles: Role[];

    @BelongsTo(() => Role)
    roles: Role[];

    // @ForeignKey(() => Role)
    // @BelongsToMany(() => Role)
    // roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}
