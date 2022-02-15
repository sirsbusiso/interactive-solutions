SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE DATABASE InteractiveDB
GO

USE InteractiveDB

CREATE TABLE tb_Customer
(
 [Id] int primary key identity(1,1),
 [Name] varchar(50) null,
 [Surname] varchar(50) null,
 [Age] int null,
 [DoB] datetime null,
 [IdNumber] varchar(13) null
)

CREATE TABLE tb_Document
(
 [Id] int primary key identity(1,1),
 [CustId] int foreign key references tb_Customer(Id),
 [FileName] varchar(255) null,
 [FileType] varchar(255) null,
 [File] varbinary(max) null,
 [DateAdded] datetime null,
)

CREATE PROCEDURE sp_AddDocument 
	@CustId INT,
	@FileName VARCHAR(255),
	@FileType VARCHAR(255),
	@File VARBINARY(MAX),
	@DateAdded DATETIME
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	--SET NOCOUNT ON;
	
    INSERT INTO dbo.tb_Document ([CustId], [FileName], [FileType], [File], [DateAdded]) 
                    VALUES (@CustId, @FileName, @FileType, @File, @DateAdded)
END
GO

CREATE PROCEDURE sp_DeleteDocument
	@Id int
AS
BEGIN
	
	DELETE FROM tb_Document WHERE Id = @Id
END
GO

CREATE PROCEDURE sp_GetDocumentById
	-- Add the parameters for the stored procedure here
	@Id int
AS
BEGIN
	
	SELECT * FROM tb_Document WHERE Id = @Id

END
GO

CREATE PROCEDURE sp_GetAllDocumentsByCustomer
	@CustId int
AS
BEGIN
	
	SELECT * FROM tb_Document WHERE CustId = @CustId

END
GO