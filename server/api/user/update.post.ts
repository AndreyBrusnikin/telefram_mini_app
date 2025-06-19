export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Валидация данных
    if (!body.firstName || typeof body.firstName !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Имя обязательно для заполнения'
      })
    }

    if (body.firstName.length > 50) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Имя не должно превышать 50 символов'
      })
    }

    if (body.lastName && body.lastName.length > 50) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Фамилия не должна превышать 50 символов'
      })
    }

    // Здесь можно добавить логику сохранения в базу данных
    // const updatedUser = await saveUserToDatabase(body)

    // Имитация успешного ответа
    const updatedProfile = {
      id: body.id,
      firstName: body.firstName.trim(),
      lastName: body.lastName?.trim() || '',
      username: body.username,
      photoUrl: body.photoUrl,
      displayName: `${body.firstName.trim()} ${body.lastName?.trim() || ''}`.trim()
    }

    return {
      success: true,
      data: updatedProfile,
      message: 'Профиль успешно обновлен'
    }
  } catch (error) {
    console.error('Ошибка обновления профиля:', error)
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Внутренняя ошибка сервера'
    })
  }
}) 